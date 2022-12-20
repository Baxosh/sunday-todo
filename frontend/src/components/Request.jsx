import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import Test, { Main } from '../utils/data' // default boshat object shart ne, agar named boshat objecta durnashba megirem

export default function Request() {
	// const apiTodos = 'https://jsonplaceholder.typicode.com/todos'
	const localAPI = 'http://localhost:8000/todos'
	const detailTodo = 'http://localhost:8000/todo/id'
	const [todos, setTodos] = useState([]) // 2 ta vazifesh has, malumotni o'zida saqlaydi, Componentaya rerender mekunat
	const [loading, setLoading] = useState(true) // destruction xonaba mebinem. Vladilen Minina pleylistashba has

	// GET, POST, PUT, DELETE

	useEffect(() => getTodos(), [loading])
	// hook. Lifecycle. Жизненный цикл. Chidir kor kadagi payt yakum parameter budadigi functionna jogzadan

	function getTodos() {
		fetch(localAPI)
			.then(res => res.json())
			.then(setTodos)
			.catch(console.log)
			.finally(() => setLoading(false))
	}

	function postTodo() {
		const title = prompt('What is your name?')
		fetch(localAPI, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title
			})
		})
			.then(() => getTodos())
			.catch(console.log)
	}

	function putTodo() {
		const id = +prompt('Enter a id !')
		const title = prompt('What is your name?')

		fetch(detailTodo.replace('id', id), {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title
			})
		})
			.then(getTodos)
			.catch(console.log)

	}


	return (
		<div>
			<h1 className='title has-text-centered'>Hello</h1>
			<div className='column is-8 is-flex is-justify-content-space-around m-auto'>
				<button onClick={getTodos} className="button is-primary">Get Todos</button>
				<button onClick={postTodo} className="button is-success">Post Todo</button>
				<button onClick={putTodo} className="button is-link">Put Todo</button>
			</div>

			<div className='column is-8 is-flex is-flex-direction-column is-justify-content-center m-auto'>
				{loading ? <div className='m-auto'><button className="button is-loading is-large"></button></div> :
					todos.map(todo => (
						<div key={todo.id} className="is-flex">
							<h1 className='title mr-4'>{todo.id}:</h1>
							<h1 className='title'>{todo.title}</h1>
						</div>
					))
				}
			</div>
		</div>
	)
}



// 1. Vladilen pleylist dest