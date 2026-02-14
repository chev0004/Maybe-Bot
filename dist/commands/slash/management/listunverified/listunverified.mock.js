/**
 * Generates a specified number of fake GuildMember-like objects for testing.
 * @param count The number of fake members to generate.
 * @returns An array of fake member objects.
 */
const generateFakeMembersArray = (count) => {
    const fakeMembers = [];
    for (let i = 0; i < count; i++) {
        const fakeId = (BigInt(Date.now()) -
            BigInt(i * 100000) +
            BigInt(Math.floor(Math.random() * 10000))).toString();
        const threeYearsInMillis = 3 * 365 * 24 * 60 * 60 * 1000;
        const createdAt = Date.now() - Math.floor(Math.random() * threeYearsInMillis);
        const joinedAt = createdAt + Math.floor(Math.random() * (Date.now() - createdAt));
        fakeMembers.push({
            id: fakeId,
            joinedTimestamp: joinedAt,
            user: {
                id: fakeId,
                username: `FakeUser${String(i + 1).padStart(3, "0")}`,
                createdTimestamp: createdAt,
            },
            roles: {
                cache: {
                    has: () => false,
                },
            },
        });
    }
    return fakeMembers;
};
// Export different scenarios or a default generator
export const mockData = {
    default: () => generateFakeMembersArray(151),
    empty: () => [],
    few: () => generateFakeMembersArray(3),
};
