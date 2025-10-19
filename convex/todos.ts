import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').order('desc').collect();
    return todos;
  },
});

export const createTodo = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('todos', {
      title: args.title,
      description: args.title,
      completed: false,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id('todos'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.title,
    });
  },
});

export const toggleTodoCompleted = mutation({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }
    return await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const deleteAllTodos = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').collect();
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return { deletedCount: todos.length };
  },
});
