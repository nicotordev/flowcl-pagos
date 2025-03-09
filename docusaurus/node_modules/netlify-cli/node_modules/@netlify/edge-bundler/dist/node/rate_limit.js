export var RateLimitAlgorithm;
(function (RateLimitAlgorithm) {
    RateLimitAlgorithm["SlidingWindow"] = "sliding_window";
})(RateLimitAlgorithm || (RateLimitAlgorithm = {}));
export var RateLimitAggregator;
(function (RateLimitAggregator) {
    RateLimitAggregator["Domain"] = "domain";
    RateLimitAggregator["IP"] = "ip";
})(RateLimitAggregator || (RateLimitAggregator = {}));
export var RateLimitAction;
(function (RateLimitAction) {
    RateLimitAction["Limit"] = "rate_limit";
    RateLimitAction["Rewrite"] = "rewrite";
})(RateLimitAction || (RateLimitAction = {}));
