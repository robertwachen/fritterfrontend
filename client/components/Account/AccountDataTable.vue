<template>
    <table>
        <tr>
            <th>First Name</th>
            <td>{{ $store.state.firstName }}</td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>{{ $store.state.lastName }}</td>
        </tr>
        <tr>
            <th>Username</th>
            <td>@{{ $store.state.username }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $store.state.email }}</td>
        </tr>
        <tr>
            <th>Phone Number</th>
            <td>{{ $store.state.phone }}</td>
        </tr>
        <tr>
            <th>Birthday</th>
            <td>{{ $store.state.birthday }}</td>
        </tr>
        <tr>
            <th>Verified Clubs</th>
            <td>{{ $store.state.verifiedClubs }}</td>
        </tr>
        <tr>
            <th>Pending Clubs</th>
            <td>{{ $store.state.pendingClubs }}</td>
        </tr>
        
    </table>
</template>

<style>
    table {
        border-collapse: collapse;
        border: 1px solid black;
    }
    th, td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
    }
</style>