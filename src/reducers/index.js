import {combineReducers} from 'redux';
import autenticacaoReducers from "./autenticacaoReducers.js";
import perfilReducers from "./perfilReducers.js";
import publicacaoReducers from "./publicacaoReducers.js";
import feedReducers from "./feedReducers.js";
import mensagemReducers from "./mensagemReducers.js";
import enviaMensagemReducers from "./enviaMensagemReducers.js";
import ultimasConversasReducer from "./ultimasConversasReducer.js";
import relacoesReducers from "./relacoesReducers.js";



export default combineReducers({
	autenticacaoReducers,
	perfilReducers,
	publicacaoReducers,
	feedReducers,
	mensagemReducers,
	enviaMensagemReducers,
	ultimasConversasReducer,
	relacoesReducers
})