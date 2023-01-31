import { EntityManager, EntityName, EventArgs, EventSubscriber, Subscriber } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserSubscriber implements EventSubscriber<UserEntity> {

  constructor(em: EntityManager) {
    em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities(): EntityName<UserEntity>[] {
    return [UserEntity];
  }

  async afterCreate(args: EventArgs<UserEntity>): Promise<void> {
    console.log(`AFTER USER CREATE: `, args);
  }

  async afterUpdate(args: EventArgs<UserEntity>): Promise<void> {
    console.log(`AFTER USER UPDATE: `, args);
  }
}
