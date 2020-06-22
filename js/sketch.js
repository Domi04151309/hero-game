import Model from './model/Model.js';
import View from './view/view.js';
import Controller from './controller/Controller.js';

window.app = new Controller(new View(), new Model());
