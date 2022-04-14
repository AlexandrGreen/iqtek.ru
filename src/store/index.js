import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
const vuexLocal = new VuexPersistence({
    key: 'iqtek',
    storage: process.env.VUE_APP_REPO === 'IndexedDB' ? localForage : window.localStorage,
    asyncStorage: process.env.VUE_APP_REPO === 'IndexedDB',
});

export default createStore({

    state: {
        users: [],
    },

    getters: {
        filteredUsers: state  => name => {
            let search = ('' + name).trim();
            if (search.length) {
                return state.users.filter(user => user.name.includes(search));
            } else {
                return state.users;
            }
        },
    },

    mutations: {
        createUser(state, name) {
            let value = ('' + name).trim();
            if (value.length) {
                state.users.push({
                    id: Date.now(),
                    name: value,
                });
            }
        },
        changeUser(state, {id, name}) {
            let value = ('' + name).trim(),
                user = state.users.find(user => user.id === id);
            if (value.length && user) {
                user.name = value;
            }
        },
        deleteUser(state, id) {
            let user = state.users.find(user => user.id === id);
            if (user) {
                state.users.splice(state.users.indexOf(user), 1);
            }
        },
    },

    plugins: [vuexLocal.plugin],

})
