import { gql } from "@apollo/client"


export const GET_USERS = gql`
    query{
        users {
            name
            lastName
            email
        }
    }
`

export const GET_USER = gql`
    query($email: String!, $password: String!) {
        user(email: $email, password: $password) {
            name
            lastName
            email
        }
    }
`

export const CREATE_USER = gql`
    mutation($email: String!, $password: String!, $name: String, $lastName: String) {
        createUser(email: $email, password: $password, name: $name, lastName: $lastName) {
            name
            lastName
            email
        }
    }
`