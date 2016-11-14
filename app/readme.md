# Structure the stylesheets folder
- The **modules** directory is reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
_all.scss_ : Include to get all modules
_utility.scss_ : Module name
_colors.scss_ : Etc...
- The **partials** directory is where the meat of my CSS is constructed.
_base.sass_ : Imports for all mixins + global project variables
_buttons.scss_ : buttons
_grids.scss_ : grids
_typography.scss_ : typography
_reset.scss_ : reset
- The **vendor** directory is for third-party CSS.
_colorpicker.scss_
_jquery.ui.core.scss_
