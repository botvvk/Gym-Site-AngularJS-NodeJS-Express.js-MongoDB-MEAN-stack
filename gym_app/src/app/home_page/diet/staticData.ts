export interface reservationPerWeek {
    program: string;
    totalCount: number;
    type: string;
    multipler: number
}

export const staticData: Array<reservationPerWeek> = [
    {
        program: "trx",
        totalCount: 30,
        type: "month",
        multipler: 2
    },
    {
        program: "pilates",
        totalCount: 10,
        type: "month",
        multipler: 5
    },
    {
        program: "program1",
        totalCount: 3,
        type: "month",
        multipler: 4

    }, {
        program: "program2",
        totalCount: 2,
        type: "month",
        multipler: 6

    },
]