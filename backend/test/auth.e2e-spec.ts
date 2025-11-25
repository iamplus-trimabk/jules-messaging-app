import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { E2ETestModule } from './e2e-test.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const mobileNumber = '+15551234568';
  let otp: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [E2ETestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/request-otp (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/request-otp')
      .send({ mobileNumber })
      .expect(200);

    expect(response.body.message).toBe('OTP has been sent.');
    expect(response.body.otp).toBeDefined();
    otp = response.body.otp;
  });

  it('/auth/verify-otp (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/verify-otp')
      .send({ mobileNumber, otp })
      .expect(200)
      .then(res => {
          expect(res.body.accessToken).toBeDefined();
          expect(res.body.user.mobileNumber).toBe(mobileNumber);
      });
  });
});
