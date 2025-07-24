'use server';

import { revalidatePath } from 'next/cache';
import { handleError } from '../utils';
import { CreateUserParams, UpdateUserParams } from '@/types';
import prisma from '../prisma';

// CREATE
export async function createUser(user: CreateUserParams) {
    try {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.clerkId,
                email: user.email,
                username: user.username,
                photo: user.photo,
                firstName: user.firstName,
                lastName: user.lastName,
                planId: user.planId || 1,
                creditBalance: user.creditBalance || 10,
            },
        });

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// READ
export async function getUserById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) throw new Error('User not found');

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId },
            data: {
                email: user.email,
                username: user.username,
                photo: user.photo,
                firstName: user.firstName,
                lastName: user.lastName,
                planId: user.planId,
                creditBalance: user.creditBalance,
            },
        });

        if (!updatedUser) throw new Error('User update failed');

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {
        const userToDelete = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!userToDelete) {
            throw new Error('User not found');
        }

        const deletedUser = await prisma.user.delete({
            where: { id: userToDelete.id },
        });

        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
        const updatedUserCredits = await prisma.user.update({
            where: { id: userId },
            data: {
                creditBalance: {
                    increment: creditFee,
                },
            },
        });

        if (!updatedUserCredits) throw new Error('User credits update failed');

        return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}
