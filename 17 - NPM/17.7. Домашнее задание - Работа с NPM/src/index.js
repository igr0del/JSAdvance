import { Task } from './task.js';
import { User } from './user.js';

const task = new Task('Задача выполнена через Rollup!');
const user = new User(task);

user.do();
