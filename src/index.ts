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

    // Sum the values of a numeric field
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

    // Pluck a specific key from all items
    pluck<K extends keyof T>(key: K): Collection<T[K]> {
        const plucked = this.items.map((item) => item[key]);
        return new Collection(plucked);
    }
}