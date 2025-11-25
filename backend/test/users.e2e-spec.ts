import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { E2ETestModule } from './e2e-test.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  const mobileNumber = '+15551234569';

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [E2ETestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // 1. Request OTP
    const otpResponse = await request(app.getHttpServer())
      .post('/auth/request-otp')
      .send({ mobileNumber });
    const otp = otpResponse.body.otp;

    // 2. Verify OTP and get token
    const authResponse = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ mobileNumber, otp });
    accessToken = authResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/me (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then(res => {
          expect(res.body.mobileNumber).toBe(mobileNumber);
      });
  });

  it('/users/me (PATCH)', () => {
      const updateDto = { firstName: 'John', lastName: 'Doe' };
      return request(app.getHttpServer())
        .patch('/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateDto)
        .expect(200)
        .then(res => {
            expect(res.body.firstName).toBe('John');
            expect(res.body.lastName).toBe('Doe');
        });
  });
});
