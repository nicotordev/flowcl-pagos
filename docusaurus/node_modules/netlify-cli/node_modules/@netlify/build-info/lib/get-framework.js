import { Accuracy } from './frameworks/framework.js';
import { frameworks } from './frameworks/index.js';
/** Return some information about a framework used by a project. */
export async function getFramework(frameworkId, project) {
    const frameworkList = frameworks.map((Framework) => new Framework(project));
    const framework = frameworkList.find(({ id }) => id === frameworkId);
    if (framework) {
        framework.detected = { accuracy: Accuracy.Forced };
        const detected = await framework.detect();
        if (detected) {
            return detected;
        }
        // this indicate that framework's custom "detect" method doesn't honor the forced framework
        throw new Error(`Forced framework "${frameworkId}" was not detected.`);
    }
    const frameworkIds = frameworkList
        .map(({ id }) => id)
        .sort()
        .join(', ');
    throw new Error(`Invalid framework "${frameworkId}". It should be one of: ${frameworkIds}`);
}
//# sourceMappingURL=get-framework.js.map