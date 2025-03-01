import { createHeap } from '../heap';
import { createPredFnWithNull } from '../predFn';

type Project = { profit: number; capital: number };

const findMaximizedCapital2 = (
    k: number,
    w: number,
    projects: Project[]
): number => {
    projects.sort((a, b) => a.capital - b.capital);

    const heap = createHeap<Project>(
        createPredFnWithNull((a, b) => b.profit - a.profit)
    );

    let index = 0;
    while (true) {
        const projectIn = projects[index];

        while (!projectIn || projectIn.capital > w) {
            const projectOut = heap.take();
            if (projectOut === null) {
                return w;
            }
            w += projectOut.profit;
            --k;

            if (k < 1) {
                return w;
            }
        }

        heap.push(projectIn);
        ++index;
    }
};

export const findMaximizedCapital = (
    k: number,
    w: number,
    profits: number[],
    capital: number[]
): number => {
    const projects = profits.map((profit, index): Project => {
        return { profit, capital: capital[index] };
    });

    return findMaximizedCapital2(k, w, projects);
};
