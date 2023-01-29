import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  // @TODO in production, use appropriate measures such as a secrets vault, environment variable, or configuration service
  secret: '&NK67E#xKKm6E69hkNq$hyhJUjHW3&zk',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
