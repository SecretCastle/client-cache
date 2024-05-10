const url = '/login'
const protected_url = '/protected'

import {lux, static_server} from '../fetch_source.js'


lux(static_server + url, 'GET')

lux(static_server + protected_url, 'GET')

