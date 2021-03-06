import React, { useEffect, useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import SearchBar from './components/SearchBar/SearchBar'
import CodeCard from './components/CodeCard/CodeCard'
import searchCode from './api/api'

import 'highlight.js/styles/github-gist.css'
import './App.css'

const useStyles = makeStyles(() => ({
	'@global': {
		html: {
			backgroundColor: '#eeeeef',
			fontFamily: 'Menlo',
		}
	},
	searchBar: {
		borderRadius: '6px',
		border: '1px solid #D7DAE0',
		backgroundColor: '#fff',
		width: '57em',
		margin: 'auto',
	},
	appbar: {
		height: '6em',
		backgroundColor: '#fff',
		boxShadow: 'none',
	},
	appbarMargin: {
		height: '8em',
	}
}))

function App() {
	const classes = useStyles()
	const [query, setQuery] = useState('')
	const [codes, setCodes] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		searchCode('', 10)
			.then(codes => {
				setCodes(codes.codes)
			})
	}, [])

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Busqueda de codigo
			setLoading(true)
			searchCode(query, 10)
				.then(codes => {
					setCodes(codes.codes)
					setLoading(false)
				})
		}
	}

	return (
		<div>
			<AppBar position='fixed' className={classes.appbar}>
				<SearchBar
					className={classes.searchBar}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
			</AppBar>
			<div className={classes.appbarMargin} />
			<Container maxWidth="md">
				<Grid container spacing={3}>
					{codes.map((code, index) => (
						<CodeCard key={index} code={code} loading={loading} />
					))}
				</Grid>
			</Container>
		</div>
	)
}

export default App
