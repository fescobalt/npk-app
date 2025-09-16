import { Quote, ToDo } from "./enitities";

export class Requester {
  static baseUrl = "https://dummyjson.com";
  static limit = 10;
  
  static async getTodos(skip = 0, limit = Requester.limit) : Promise<{todos: Array<ToDo>, total: number, skip: number, limit: number}> {
    const res = await fetch(`${this.baseUrl}/todos?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
      throw new Error(`Error fetching todos: ${res.statusText}`);
    }
    return res.json();
  }

  static async getQuotes(skip = 0, limit = Requester.limit) : Promise<{quotes: Array<Quote>, total: number, skip: number, limit: number}> {
    const res = await fetch(`${this.baseUrl}/quotes?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
      throw new Error(`Error fetching quotes: ${res.statusText}`);
    }
    return res.json();
  }
}