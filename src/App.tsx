import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useState, useEffect } from'react';
import FilterBar from './components/FilterBar';
import UserTable from './components/UserTable';
import { fetchUsers } from './services/UserService';
import { debounce } from "lodash";
import { User } from './interface/UserInterface';

function App() {
	const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [highlight, setHighlight] = useState<boolean>(false);

    useEffect(() => {
        const loadUsers = async () => {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setCities([...new Set(fetchedUsers.map((user: User) => user.address.city))] as string[]);
        };
        loadUsers();
    }, []);

    const filterByName = debounce((name: string) => {
        setFilteredUsers(
            users.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(name.toLowerCase())
            )
        );
    }, 1000);

    const filterByCity = (city: string) => {
        setFilteredUsers(
            users.filter(user => user.address.city === city || city === '')
        );
    };

    const highlightOldestPerCity = (highlight: boolean) => {
        setHighlight(highlight);
    };

    useEffect(() => {
        if (highlight) {
            const oldestUsers = users.reduce((acc: User[], user: User) => {
                const existing = acc.find(u => u.address.city === user.address.city);
                if (!existing || new Date(existing.birthDate) > new Date(user.birthDate)) {
                    return [...acc.filter(u => u.address.city !== user.address.city), user];
                }
                return acc;
            }, []);
            setFilteredUsers(oldestUsers);
        } else {
            setFilteredUsers(users);
        }
    }, [highlight, users]);

  
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
            <div className="container">
            <FilterBar
                onNameFilterChange={filterByName}
                onCityFilterChange={filterByCity}
                cities={cities}
                onHighlightChange={highlightOldestPerCity}
            />
            <UserTable users={filteredUsers} />
          
            </div>
			</div>
		</>
	);
}

export default App;


	
  
	