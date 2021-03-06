import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
	maxId = 100;

	constructor() {
		super();

		this.state = {
			todoData: [
				this.creatTodoItem('Drink Coffe'),
				this.creatTodoItem('Make Awesome App'),
				this.creatTodoItem('Have a lunch')
			]
		};
	};

	creatTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {

			const idx = todoData.findIndex((el) => el.id === id);
			const newTodoData = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				todoData: newTodoData
			};

		});
	};

	addItem = (text) => {

		const newItem = this.creatTodoItem(text);

		this.setState(({ todoData }) => {
			const newaddItem = [
				...todoData,
				newItem
			];

			return {
				todoData: newaddItem
			};
		});
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);

		//1. update object
		const oldItem = arr[idx];
		const newItem = {
			...oldItem,
			[propName]: !oldItem.[propName]
		};
		//2. construct new array

		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)
		];

	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			};
		});
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			};
		});
	};

	render() {

		const { todoData } = this.state;

		const doneCount = todoData
			.filter((el) => el.done).length;

		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<TodoList todos={todoData}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>

				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	};
};