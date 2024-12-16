export class Collection<T> {
    private items: T[];

    constructor(items: T[] = []) {
        this.items = items;
    }

    // Add item(s) to the collection
    add(item: T | T[]): this {
        if (Array.isArray(item)) {
            this.items = [...this.items, ...item];
        } else {
            this.items.push(item);
        }
        return this;
    }

    // Filter items based on a condition (like `where` in Laravel)
    where(key: keyof T, value: any): Collection<T> {
        const filtered = this.items.filter((item) => item[key] === value);
        return new Collection(filtered);
    }

    // Find a single item (first match)
    find(key: keyof T, value: any): T | undefined {
    return this.items.find((item) => item[key] === value);
}

// Transform items (like `map` in Laravel)
map<R>(callback: (item: T, index: number) => R): Collection<R> {
    const mapped = this.items.map(callback);
    return new Collection(mapped);
}

// Sort items
sortBy(key: keyof T, direction: 'asc' | 'desc' = 'asc'): Collection<T> {
    const sorted = [...this.items].sort((a, b) => {
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        return 0;
    });
    return new Collection(sorted);
}

// Get the first item
first(): T | undefined {
    return this.items[0];
}

// Get the last item
last(): T | undefined {
    return this.items[this.items.length - 1];
}

// Return the underlying array
all(): T[] {
    return this.items;
}

// Get the count of items
count(): number {
    return this.items.length;
}

sum(key: keyof T): number {
    return this.items.reduce((total, item) => {
        const value = item[key];
        return total + (typeof value === 'number' ? value : 0);
    }, 0);
}

// Check if any items match a condition
contains(callback: (item: T) => boolean): boolean {
    return this.items.some(callback);
}

pluck<K extends keyof T>(key: K): Collection<T[K]> {
    const plucked = this.items.map((item) => item[key]);
    return new Collection(plucked);
}
}

const users: {
    id: number;
    name: string;
    age: number;
    class: string;
}[] = [
    { id: 1, name: 'Alice', age: 20, class: 'Math' },
    { id: 2, name: 'Bob', age: 22, class: 'Physics' },
    { id: 3, name: 'Charlie', age: 21, class: 'Chemistry' },
    { id: 4, name: 'Daisy', age: 23, class: 'Biology' },
    { id: 5, name: 'Edward', age: 19, class: 'History' },
    { id: 6, name: 'Fiona', age: 20, class: 'English' },
    { id: 7, name: 'George', age: 22, class: 'Art' },
    { id: 8, name: 'Hannah', age: 21, class: 'Music' },
    { id: 9, name: 'Ivy', age: 20, class: 'Geography' },
    { id: 10, name: 'Jack', age: 23, class: '5tr' },
];

const collectionUser = new Collection(users);

// 1. Tìm user có tuổi 20
// users.filter((user) => user.age === 20);
collectionUser.where('age', 20).all();

// 2. Đếm số user trong lớp 'English'
// users.filter((user) => user.class === 'English').length;
collectionUser.where('class', 'English').count();

// 3. Tính tổng tuổi của user trong lớp 'English'
// users
//   .filter((user) => user.class === 'English')
//   .reduce((sum, user) => sum + user.age, 0);
collectionUser.where('class', 'English').sum('age');

// 4. Lấy user đầu tiên trong lớp 'English'
// users.find((user) => user.class === 'English');
collectionUser.where('class', 'English').first();

// 5. Sắp xếp user theo lớp theo thứ tự giảm dần
// [...users].sort((a, b) => (a.class > b.class ? -1 : a.class < b.class ? 1 : 0));
collectionUser.sortBy('class', 'desc').all();

// 6. Lấy danh sách tên user
// users.filter((student) => student.age > 20).map((student) => student.name);
collectionUser.pluck('name').all();
