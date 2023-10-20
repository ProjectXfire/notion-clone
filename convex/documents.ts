import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { type Doc, type Id } from './_generated/dataModel';

export const getSidebar = query({
  args: { userId: v.string(), parentDocument: v.optional(v.id('documents')) },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', args.userId).eq('parentDocument', args.parentDocument)
      )
      .filter((q) => q.eq(q.field('isArchive'), false))
      .order('desc')
      .collect();
    return documents;
  }
});

export const getTrash = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .filter((q) => q.eq(q.field('isArchive'), true))
      .order('desc')
      .collect();
    return documents;
  }
});

export const getSearch = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    if (userId.length === 0) throw new Error('Not autneticated');
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchive'), false))
      .order('desc')
      .collect();
    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents'))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error('Not autneticated');
    const userId = identity.subject;
    const document = await ctx.db.insert('documents', {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchive: false,
      isPublished: false
    });
    return document;
  }
});

export const archive = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error('Not autneticated');
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);
    if (existingDocument === null) throw new Error('Not found');
    if (existingDocument.userId !== userId) throw new Error('Unauthorized');
    const recursiveArchive = async (documentId: Id<'documents'>): Promise<void> => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, { isArchive: true });
        await recursiveArchive(child._id);
      }
    };
    await ctx.db.patch(args.id, { isArchive: true });
    await recursiveArchive(args.id);
  }
});

export const restoreArchive = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error('Not autneticated');
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);
    if (existingDocument === null) throw new Error('Not found');
    if (existingDocument.userId !== userId) throw new Error('Unauthorized');
    const recursiveRestore = async (documentId: Id<'documents'>): Promise<void> => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, { isArchive: false });
        await recursiveRestore(child._id);
      }
    };
    const options: Partial<Doc<'documents'>> = {
      isArchive: false
    };
    if (existingDocument.parentDocument !== undefined) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchive !== undefined && parent.isArchive) {
        options.parentDocument = undefined;
      }
    }
    await ctx.db.patch(args.id, options);
    await recursiveRestore(args.id);
    return existingDocument;
  }
});

export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error('Not authenticated');
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);
    if (existingDocument === null) throw new Error('Not found');
    if (existingDocument.userId !== userId) throw new Error('Unauthorized');
    await ctx.db.delete(args.id);
    return existingDocument;
  }
});
