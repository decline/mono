import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_STRATEGY_NAME } from './local.strategy';

@Injectable()
export class LocalGuard extends AuthGuard(LOCAL_STRATEGY_NAME) {}
