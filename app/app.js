import Vue from 'nativescript-vue'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import * as ApplicationSettings from "tns-core-modules/application-settings";
import Navigator from "nativescript-vue-navigator";
import { routes } from './routes'
import VueApollo from "vue-apollo";
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink
} from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});
const httpLink = new HttpLink({
    uri: "http://192.168.1.63:8080/graphql"
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from ApplicationSettings if it exists
    var tokenInAppSettings = ApplicationSettings.getString("token");
    // return the headers to the context so HTTP link can read them
    return {
        headers: {
            ...headers,
            authorization: tokenInAppSettings
                ? `Bearer ${tokenInAppSettings}`
                : null
        }
    };
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
})

Vue.use(VueApollo);
Vue.use(Navigator, { routes })

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
'fa': './assets/font-awesome.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);




Vue.filter('fonticon', fonticon);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = false

new Vue({
    apolloProvider,
    render: h => h("Navigator", { attrs: { defaultRoute: '/home'}}),
}).$start();
