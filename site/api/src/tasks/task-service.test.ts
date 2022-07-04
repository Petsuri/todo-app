import * as uuid from 'uuid';
import { taskBuilder, taskRepositoryBuilder, TaskServiceBuilder } from './test.builders';

jest.mock('uuid');

describe('TaskService', () => {
  describe('create', () => {
    it('should save new task correctly', async () => {
      jest.spyOn(uuid, 'v4').mockReturnValue('X_UUID_X');
      const repository = taskRepositoryBuilder().build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      await sut.create({ text: 'new_text' });

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith({
        uuid: 'X_UUID_X',
        text: 'new_text',
        isDone: false,
      });
    });
    it('should return created task', async () => {
      jest.spyOn(uuid, 'v4').mockReturnValue('xxx');
      const sut = new TaskServiceBuilder().build();

      const actual = await sut.create({ text: 'yyy' });

      expect(actual).toStrictEqual({
        uuid: 'xxx',
        text: 'yyy',
        isDone: false,
      });
    });
  });
  describe('loadAll', () => {
    it('should return loaded tasks', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(
          jest
            .fn()
            .mockResolvedValue([
              taskBuilder().uuid('1_uuid').text('1_text').isDone(true).build(),
              taskBuilder().uuid('2_uuid').text('2_text').isDone(false).build(),
            ])
        )
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      const actual = await sut.loadAll();

      expect(actual).toStrictEqual([
        {
          uuid: '1_uuid',
          text: '1_text',
          isDone: true,
        },
        {
          uuid: '2_uuid',
          text: '2_text',
          isDone: false,
        },
      ]);
    });
  });
  describe('delete', () => {
    it('should save tasks without selected task', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(
          jest
            .fn()
            .mockResolvedValue([
              taskBuilder().uuid('1_uuid').text('1_text').isDone(true).build(),
              taskBuilder().uuid('2_uuid').text('2_text').isDone(false).build(),
            ])
        )
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      await sut.delete('1_uuid');

      expect(repository.saveAll).toHaveBeenCalledTimes(1);
      expect(repository.saveAll).toHaveBeenCalledWith([
        {
          uuid: '2_uuid',
          text: '2_text',
          isDone: false,
        },
      ]);
    });
    it('should return true when task is deleted', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(
          jest
            .fn()
            .mockResolvedValue([taskBuilder().uuid('1_uuid').text('1_text').isDone(true).build()])
        )
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      const actual = await sut.delete('1_uuid');

      expect(actual).toBe(true);
    });
    it('should return false when task is not found', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(jest.fn().mockResolvedValue([taskBuilder().uuid('xxx').build()]))
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      const actual = await sut.delete('yyy');

      expect(actual).toBe(false);
      expect(repository.saveAll).not.toBeCalled();
    });
  });
  describe('markDone', () => {
    it('should return null if task is not found', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(jest.fn().mockResolvedValue([taskBuilder().uuid('yyy').build()]))
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      const actual = await sut.markDone('xxx');

      expect(actual).toBeNull();
      expect(repository.saveAll).not.toBeCalled();
    });
    it('should set only selected task done and save correctly', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(
          jest
            .fn()
            .mockResolvedValue([
              taskBuilder().uuid('selected').text('text').isDone(false).build(),
              taskBuilder().uuid('not_selected').text('text').isDone(false).build(),
            ])
        )
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      await sut.markDone('selected');

      expect(repository.saveAll).toHaveBeenCalledTimes(1);
      expect(repository.saveAll).toHaveBeenCalledWith([
        {
          uuid: 'selected',
          text: 'text',
          isDone: true,
        },
        {
          uuid: 'not_selected',
          text: 'text',
          isDone: false,
        },
      ]);
    });
    it('should return selected task', async () => {
      const repository = taskRepositoryBuilder()
        .loadAll(
          jest
            .fn()
            .mockResolvedValue([taskBuilder().uuid('selected').text('').isDone(false).build()])
        )
        .build();
      const sut = new TaskServiceBuilder().withRepository(repository).build();

      const actual = await sut.markDone('selected');

      expect(actual).toStrictEqual({
        uuid: 'selected',
        text: '',
        isDone: true,
      });
    });
  });
});
