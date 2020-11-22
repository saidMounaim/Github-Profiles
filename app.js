const APIURL = 'https://api.github.com/users';
const APISEARCHURL = 'https://api.github.com/search/users?q=';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.querySelector('main');

async function fetchApi(api) {
	const res = await fetch(api);
	const data = await res.json();

	return data;
}

function notFoundUser() {
	main.innerHTML = '';
	const TitleNotFound = document.createElement('h1');
	TitleNotFound.innerHTML = 'Not Found User';
	main.append(TitleNotFound);
}

function showProfile(results) {
	main.innerHTML = '';

	results.forEach((res) => {
		const profileElm = document.createElement('div');

		profileElm.classList.add('profile');

		profileElm.innerHTML = `
            <img src="${res.avatar_url}" alt="" srcset="" />
            <div class="profile-info">
                <div class="profile-header">
                    <h4>${res.login}</h4>
                    <span>${res.repos_url.length} Repos</span>
                </div>
                <a href="${res.html_url}">Get More Details</a>
            </div>
        `;
		main.append(profileElm);
	});
}

form.addEventListener('keyup', searchProfile);

async function searchProfile() {
	main.innerHTML = '';

	const searchValue = search.value;

	if (searchValue) {
		const profiles = await fetchApi(
			`https://api.github.com/search/users?q=${searchValue}+repos:%3E42+followers:%3E1000`
		);
		if (profiles.items.length < 1) {
			notFoundUser();
		} else {
			showProfile(profiles.items);
		}
	} else {
		getProfiles();
	}
}

async function getProfiles() {
	const profiles = await fetchApi(APIURL);

	showProfile(profiles);
}

getProfiles();
