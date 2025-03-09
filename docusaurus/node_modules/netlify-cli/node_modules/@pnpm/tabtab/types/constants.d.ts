export type SupportedShell = (typeof SUPPORTED_SHELLS)[number];
export const COMPLETION_DIR: "~/.config/tabtab";
export const SUPPORTED_SHELLS: readonly ["bash", "fish", "pwsh", "zsh"];
export namespace SHELL_LOCATIONS {
    let bash: "~/.bashrc";
    let zsh: "~/.zshrc";
    let fish: "~/.config/fish/config.fish";
    let pwsh: "~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1";
}
export namespace COMPLETION_FILE_EXT {
    let bash_1: "bash";
    export { bash_1 as bash };
    let fish_1: "fish";
    export { fish_1 as fish };
    let pwsh_1: "ps1";
    export { pwsh_1 as pwsh };
    let zsh_1: "zsh";
    export { zsh_1 as zsh };
}
