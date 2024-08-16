declare -a _en_deferred_vars

en_project_vars_required() {
    _en_deferred_vars+=("$@")
}

strict_env
env_vars_required ENCIRCLE_ENV

source_env .envrc.project

if [[ "$ENCIRCLE_ENV" = local ]]; then
    source_up_if_exists .envrc.personal
fi

env_vars_required "${_en_deferred_vars[@]}"
