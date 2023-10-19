import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
// import { Doc, Id } from './_generated/dataModel';

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
