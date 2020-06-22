import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';

const app = new Controller(new View(), new Model());
