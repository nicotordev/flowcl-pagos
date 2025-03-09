export var SeverityCode;
(function (SeverityCode) {
    SeverityCode[SeverityCode["success"] = 1] = "success";
    SeverityCode[SeverityCode["buildCancelled"] = 2] = "buildCancelled";
    SeverityCode[SeverityCode["userError"] = 3] = "userError";
    SeverityCode[SeverityCode["pluginError"] = 4] = "pluginError";
    SeverityCode[SeverityCode["systemError"] = 5] = "systemError";
})(SeverityCode || (SeverityCode = {}));
