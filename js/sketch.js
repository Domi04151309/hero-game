import Model from './model/Model.js';
import View from './view/view.js';
import Controller from './controller/Controller.js';

const app = new Controller(new View(), new Model());
