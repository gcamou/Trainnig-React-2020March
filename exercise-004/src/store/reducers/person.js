import * as actionTypes from '../actions';

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            const person = {
                id: Math.random(),
                name: action.personData.name,
                age: action.personData.age
            }
            const updatePersons = state.persons.concat(person)
            return {
                ...state,
                persons: updatePersons
            }
        case actionTypes.REMOVE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.id)
            }
    }
    return state;
}

export default reducer;