//---------------------------------------------------------------------------------
//Разминка
// Определите интерфейс для пользователя
interface User {
	id: number
	name: string
	email: string // Добавьте свойство email типа string
}

// Определите интерфейс для активности пользователя
interface Activity {
	userId: number
	activity: string
	timestamp: Date // Добавьте свойство timestamp типа Date
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
	const response = await fetch(url)
	const data = await response.json()
	return data // Реализуйте получение данных с использованием fetch и возвращение их в формате json
}

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User> // Заполните тип
type ReadonlyActivity = Readonly<Activity> // Заполните тип

//Типизируйте функцию. userId - число
function getUserActivities(userId: number): Promise<Activity[]> {
	return fetchData(`/api/activities/${userId}`)
}
// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities> // Заполните тип

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean }
type BasicPermissions = { canEditProfile: boolean }
// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type UserPermissions<T> = T extends AdminPermissions
	? AdminPermissions
	: BasicPermissions

///ЧАСТЬ 2.

// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number // Заполните тип

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
	console.log(message) // Реализуйте вывод сообщения в консоль
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
	throw new Error(errorMsg) // Бросьте исключение с errorMsg
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
	return typeof value === 'string' // Верните результат проверки типа
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
	if (typeof value !== 'number') throw new Error('Значение не является числом') // Бросьте исключение, если значение не является числом
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
	if (isString(value)) {
		console.log('String value: ' + value)
	} else {
		assertIsNumber(value)
		console.log('Number value: ' + value)
	} // Реализуйте логику проверки и обработки значения
}

// Type Alias и Union
//type StringOrNumber = string | number;

//сделайте  Type Guard для определения, является ли значение строкой
function isString(value: StringOrNumber): value is string {
	return typeof value === 'string' // Верните результат проверки типа
}

// создайте asserts function на число.
function assertIsNumber(value: any): asserts value is number {
	if (typeof value !== 'number') throw new Error('Значение не является числом') // Бросьте исключение, если значение не является числом
}

// Использование Type Guard и Asserts
function processValue(value: StringOrNumber) {
	if (isString(value)) {
		console.log('String value: ' + value)
	} else {
		assertIsNumber(value)
		console.log('Number value: ' + value)
	}
}

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface Response<T> {
	data: T
	status: number
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): Response<T> {
	return {
		data: data,
		status: status,
	}
	// Реализуйте создание и возврат объекта Response
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 2, 3], 201) // Заполните вызов функции

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const user: User = { id: 1, name: 'Vania', email: 'ivan@mail.ru' }

const userResponse = createResponse(user, 201) // Заполните вызов функции
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля
type Car = {
	company: string
	model: string
	year: number
}

// Определите тип данных для описания велосипеда
type Bike = {
	company: string
	type: 'road' | 'mountain'
}

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: Car | Bike): vehicle is Car {
	return 'model' in vehicle
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
	if (isCar(vehicle)) {
		console.log('Car: ' + vehicle.company + vehicle.model + vehicle.year)
	} else {
		console.log('Bike: ' + vehicle.company + vehicle.type)
	}
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
	id: number
	name: string
	department: string
	email: string
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee> // Заполните тип

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee> // Заполните тип

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee) {
	if (employee.id !== undefined) {
		console.log('ID: ' + employee.id)
	}
	if (employee.name !== undefined) {
		console.log('Name: ' + employee.name)
	}
	if (employee.department !== undefined) {
		console.log('Department: ' + employee.department)
	}
	if (employee.email !== undefined) {
		console.log('Email: ' + employee.email)
	}
	// Реализуйте логику функции, обрабатывая случай отсутствующих свойств
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
	id: number
	name: string
	email: string
	age: number
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User['name'] // Заполните тип

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof
type UserFieldsToBoolean = {
	[T in keyof User]: boolean
}

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<T extends keyof User>(key: T): User[T] {
	return null as any
	// Верните тип ключа
}

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType('age')
const nameType = getUserFieldType('name')
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
	id: number
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(
	items: T[],
	id: number
): T | undefined {
	return items.find(item => item.id === id)
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
	{ id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
	{ id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
]
const user = findById(users, 1)
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface User {
	id: number
	name: string
	age: number
}

interface Product {
	id: number
	name: string
	price: number
}

interface Book {
	isbn: string
	title: string
	author: string
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T, K extends keyof T>(
	items: T[],
	key?: K,
	value?: T[K]
): T | undefined {
	if (!key || !value) {
		return undefined
	}
	return items.find(item => item[key] === value)
}

// Данные для тестирования функции
const users: User[] = [
	{ id: 1, name: 'Alice', age: 25 },
	{ id: 2, name: 'Bob', age: 30 },
]

const products: Product[] = [
	{ id: 1, name: 'Laptop', price: 1000 },
	{ id: 2, name: 'Smartphone', price: 500 },
]

const books: Book[] = [
	{ isbn: '12345', title: 'The TypeScript Handbook', author: 'Someone' },
	{ isbn: '67890', title: 'Learning TypeScript', author: 'Another One' },
]

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray(users, 'name', 'Alice')
// Поиск без value
const foundUser1 = findInArray(users, 'name')
// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray(products, 'price', 500)
// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray(books, 'author', 'Another One')

//Поиск по нескольким ключам одновременно
function findInArrayAllKeys<T, K extends keyof T>(
	items: T[],
	keysAndValues: { [K in keyof T]?: T[K] }
): T | undefined {
	return items.find(item =>
		Object.entries(keysAndValues).every(([key, value]) => item[key] === value)
	)
}

// Пример использования
const foundUser11 = findInArrayAllKeys(users, { name: 'Alice', age: 25 })

//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
	name: string
	age: number
}

interface Adult {
	fullName: string
	age: number
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
	items: T[],
	transform: (item: T) => U,
	filter: (item: U) => boolean
): U[] {
	const transformedItems = items.map(transform)
	const filteredItems = transformedItems.filter(filter)
	return filteredItems
}

// Пример данных
const people1: Person[] = [
	{ name: 'Alice', age: 24 },
	{ name: 'Bob', age: 17 },
	{ name: 'Charlie', age: 32 },
]

// Пример использования функции mapAndFilter
const adults1: Adult[] = mapAndFilter(
	people1,
	person => ({ fullName: person.name, age: person.age }),
	adult => adult.age >= 18
)

// Выведите результаты для проверки
console.log(adults1)

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
function mapAndFilter<T, U>(
	items: T[],
	transform: (item: T) => U,
	filter: (item: U) => boolean,
	sort?: (a: U, b: U) => number //функция сортировки, пример использования
	//function descendingOrder(a: number, b: number): number {
	//  return b - a;/return a - b;
	//}
): U[] {
	const transformedItems = items.map(transform)
	const filteredItems = transformedItems.filter(filter)
	if (sort) {
		filteredItems.sort(sort)
	}
	return filteredItems
}
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.

//Ответ: Типы T и U могут быть полностью разными или иметь общие характеристики в зависимости от требований задачи и специфики функции mapAndFilter.

//Полностью разные типы (T и U): Если функция transform преобразует элементы типа T в элементы совершенно другого типа U, то нет необходимости, чтобы эти типы имели общие характеристики. Например, мы можем преобразовывать массив чисел в массив строк, и в этом случае T и U будут полностью разными типами.

//Общие характеристики у типов (T и U): Однако, если требуется, чтобы тип U имел какие-то общие характеристики с типом T, то необходимо убедиться, что функция transform сохраняет эти характеристики. Например, если мы преобразуем массив объектов Person в массив объектов Adult, то U должен иметь характеристики, которые общи с Person, чтобы результаты преобразования оставались корректными и использование функции mapAndFilter было возможным.
//---------------------------------------------------------------------------------
