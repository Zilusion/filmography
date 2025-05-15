import { defineStore } from 'pinia';

const sampleMovies = [
	{
		id: 1,
		title: 'Интерстеллар',
		year: 2014,
		director: 'Кристофер Нолан',
		duration: '2ч 49м',
		rating: 8.6,
		poster: `${import.meta.env.BASE_URL}images/interstellar.webp`,
		genreIds: [1, 3],
		description:
			"Команда исследователей путешествует через червоточину в космосе, чтобы обеспечить выживание человечества.",
		cast: ['Мэттью Макконахи', 'Анн Хэтэуэй', 'Джессика Честейн'],
	},
	{
		id: 2,
		title: 'Темный рыцарь',
		year: 2008,
		director: 'Кристофер Нолан',
		duration: '2ч 32м',
		rating: 9.0,
		poster: `${import.meta.env.BASE_URL}images/the-dark-knight.webp`,
		genreIds: [2, 4, 3],
		description:
			'Когда Джокер разрушает и терроризирует народ Готэма, Бэтмен должен принять один из величайших психологических и физических тестов своих способностей бороться с несправедливостью.',
		cast: ['Кристиан Бейл', 'Хит Леджер', 'Аарон Экхарт'],
	},
	{
		id: 3,
		title: 'Унесенные призраками',
		year: 2001,
		director: 'Хаяо Миядзаки',
		duration: '2ч 5м',
		rating: 8.6,
		poster: `${import.meta.env.BASE_URL}images/spirited-away.jpg`,
		genreIds: [6, 7],
		description:
			"Во время переезда семьи в пригород 10-летняя девочка попадает в мир, где правят боги, ведьмы и духи, а люди превращаются в зверей.",
		cast: ['Руми Хиираги', 'Мию Ирино', 'Мари Нацуки'],
	},
	{
		id: 4,
		title: 'Начало',
		year: 2010,
		director: 'Кристофер Нолан',
		duration: '2ч 28м',
		rating: 8.8,
		poster: `${import.meta.env.BASE_URL}images/inception.webp`,
		genreIds: [1, 2, 5],
		description:
			'Вор, который крадет корпоративные секреты с помощью технологии общения в снах, получает задание внедрить идею в разум генерального директора.',
		cast: ['Леонардо Ди Каприо', 'Джозеф Гордон-Левитт', 'Эллиот Пейдж'],
	},
	{
		id: 5,
		title: 'Форрест Гамп',
		year: 1994,
		director: 'Роберт Земекис',
		duration: '2ч 22м',
		rating: 8.8,
		poster: `${import.meta.env.BASE_URL}images/forrest-gump.webp`,
		genreIds: [3, 8],
		description:
			'Президентства Кеннеди и Джонсона, Вьетнамская война, Уотергейтский скандал и другие исторические события разворачиваются с точки зрения человека из Алабамы с IQ 75, чье единственное желание - быть воссоединенным со своей детской любовью.',
		cast: ['Том Хэнкс', 'Робин Райт', 'Гэри Синис'],
	},
];

const sampleCategories = [
	{ id: 1, name: 'Фантастика', slug: 'sci-fi' },
	{ id: 2, name: 'Боевик', slug: 'action' },
	{ id: 3, name: 'Драма', slug: 'drama' },
	{ id: 4, name: 'Криминал', slug: 'crime' },
	{ id: 5, name: 'Триллер', slug: 'thriller' },
	{ id: 6, name: 'Анимация', slug: 'animation' },
	{ id: 7, name: 'Фэнтези', slug: 'fantasy' },
	{ id: 8, name: 'Роман', slug: 'romance' },
	{ id: 9, name: 'Комедия', slug: 'comedy' },
	{ id: 10, name: 'Horror', slug: 'horror' },
];

export const useMovieStore = defineStore('movie', {
	state: () => ({
		movies: sampleMovies,
		categories: sampleCategories,
	}),
	getters: {
		getMovieById: (state) => (id) => {
			return state.movies.find((movie) => movie.id === parseInt(id));
		},
		getCategoryBySlug: (state) => (slug) => {
			return state.categories.find((category) => category.slug === slug);
		},
		getMoviesByCategoryId: (state) => (categoryId) => {
			return state.movies.filter((movie) =>
				movie.genreIds.includes(categoryId)
			);
		},
		getRandomMovie: (state) => {
			if (state.movies.length === 0) return null;
			const randomIndex = Math.floor(Math.random() * state.movies.length);
			return state.movies[randomIndex];
		},
		getGenreNamesByIds: (state) => (genreIds) => {
			if (!genreIds) return [];
			return genreIds.map((id) => {
				const genre = state.categories.find((cat) => cat.id === id);
				return genre ? genre.name : 'Unknown';
			});
		},
	},
});
