import { closeClient, formatTags, startClient, validateStatsDOptions, } from '../report/statsd.js';
import { addAggregatedTimers } from './aggregate.js';
import { roundTimerToMillisecs } from './measure.js';
/**
 * Record the duration of a build phase, for monitoring.
 * Sends to statsd daemon.
 */
export const reportTimers = async function (timers, statsdOpts, framework) {
    if (!validateStatsDOptions(statsdOpts)) {
        return;
    }
    await sendTimers(addAggregatedTimers(timers), statsdOpts, framework);
};
const sendTimers = async function (timers, statsdOpts, framework) {
    const client = await startClient(statsdOpts);
    timers.forEach((timer) => {
        sendTimer(timer, client, framework);
    });
    await closeClient(client);
};
const sendTimer = function (timer, client, framework) {
    const { metricName, stageTag, parentTag, durationNs, tags } = timer;
    const durationMs = roundTimerToMillisecs(durationNs);
    const statsDTags = { stage: stageTag, parent: parentTag, ...tags };
    // Do not add a framework tag if empty string or null/undefined
    if (framework) {
        statsDTags.framework = framework;
    }
    client.distribution(metricName, durationMs, formatTags(statsDTags));
};
