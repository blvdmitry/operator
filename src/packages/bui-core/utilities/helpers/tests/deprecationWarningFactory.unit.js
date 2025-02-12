import { getWarningText } from "../deprecationWarningFactory";
const props = {
    propA: "valueA",
    propB: "valueB",
};
describe("helpers/deprecationWarningFactory", () => {
    test("deprecates prop", () => {
        const message = getWarningText(props, {
            propA: false,
        });
        expect(message).toMatchSnapshot();
    });
    test("deprecates prop with alternative", () => {
        const message = getWarningText(props, {
            propA: "propB",
        });
        expect(message).toMatchSnapshot();
    });
    test("deprecates prop value", () => {
        const message = getWarningText(props, {
            propA: {
                valueA: false,
            },
        });
        expect(message).toMatchSnapshot();
    });
    test("deprecates prop value with alternative", () => {
        const message = getWarningText(props, {
            propA: {
                valueA: "valueB",
            },
        });
        expect(message).toMatchSnapshot();
    });
    test("deprecates events value with autoCasing", () => {
        const message = getWarningText({
            onDeprecatedEvent: () => { },
        }, {
            "deprecated-event": false,
        }, {
            supportAutoCasing: true,
        });
        expect(message).toMatchSnapshot();
    });
    test("deprecates events value with autoCasing and alternative", () => {
        const message = getWarningText({
            onDeprecatedEvent: () => { },
            onNewEvent: () => { },
        }, {
            "deprecated-event": "new-event",
        }, {
            supportAutoCasing: true,
        });
        expect(message).toMatchSnapshot();
    });
});
