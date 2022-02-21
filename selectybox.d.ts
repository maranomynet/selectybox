  export type SelectyboxOptions = {
    /**
     * The HTML describing the widget.container element.
     * The template also contains the widget.button element that holds the displayed text value.
     *
     * Deafult: `'<span class="selecty"><span class="selecty-button"/></span>'`
     */
    templ: string;

    /**
     * Describes where the widget.button is within the widget.container template
     *
     * Default: `function () { return this.container.firstChild; }`
     */

    getButton: (this: Selectybox) => Element | null | undefined;
    /**
     * Additional class-name for the widget.container while the `<select/>` is focused
     *
     * Default: `'focused'`
     */
    focusClass: string;

    /**
     * Additional class-name for the widget.container while the `<select/>` is disabled
     *
     * Default: `'disabled'`
     */
    disabledClass: string;

    /**
     * Additional class-name for the widget.container while the `<select/>`'s value is `" "`
     *
     * Default: `'emptyvalue'`
     */
    emptyClass: string;

    /**
     * String to display instead of an empty string inside widget.button
     *
     * Default: `'\u00a0 \u00a0 \u00a0'`
     */
    emptyVal: string;

    /**
     * Custom modification/formatting of the displayed value.
     *
     * Default: `function (value) { return value; }`
     */
    text: (txt: string) => string | Node;

    /**
     * CSS properties to apply to the `<select/>` while the widget is active.
     *
     * Default: `{
     * 	position: 'absolute',
     * 	bottom: 0,
     * 	left: 0,
     * 	width: '100%',
     * 	height: '100%',
     * 	top: 'auto',
     * 	right: 'auto',
     * 	margin: 0,
     * 	padding: 0,
     * 	border: 0,
     * }`
     */
    selectCSS: Partial<HTMLElement['style']>;
  };

  export default class Selectybox {
    constructor(groups?: HTMLSelectElement, options?: Partial<SelectyboxOptions>);

    /** The original `<select/>` element being wrapped */
    select: HTMLSelectElement;
    /** The proxy element that contains the display text */
    button: Element;
    /** The wrapper around both `widget.select` and `widget.button` */
    container: Element;

    /** Tells you if the `window.onresize` monitoring is active or not. If your monitor is set to `manual`, it simply tells you if it has been started. */
    isRunning(): boolean;

    /**
     * Changes the <select>'s disabled property, and set the widget's disabledClass accordingly
     *
     * `.disable( false )` enables the `<select/>`
     */
    disable(disable?: boolean): void;

    /**
     * To silently update the <select>'s value (and refresh the widget's display text)
     * without triggering a DOM change event.
     */
    val(value?: string): void;

    /**
     * If the <select>'s value, or disabled state has been updated
     * (and no change event triggered), then you can silently refresh the widget
     */
    refresh(): boolean;

    /**
     * Removes the injected elements, inline styling and event handlers.
     */
    destroy(): void;

    /** Reverse-lookup for a <select>'s widget */
    static getWidget(selectElm: HTMLSelectElement): Selectybox | undefined;
  }
