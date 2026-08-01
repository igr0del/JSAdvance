import { User } from './user.js';
import { Task } from './task.js';

const task = new Task('Писать код');
const user = new User(task);

user.do();
