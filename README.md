A simple HighOrderComponent that exposes some functions related to navigator.mediaDevices

Requires React 15 or higher.

It uses [audio-recorder-polyfill](https://github.com/ai/audio-recorder-polyfill) to implement audio record into some Safari on iOS (11+). Amazing polyfill and follows specification, support that guy.
>iOS Safari does not record video. Some video constraints may broke on it when trying to open a stream

I got some ideas and/or solutions based on [react-multimedia-capture](https://github.com/rico345100/react-multimedia-capture), if my package doesn't solve your problem, go check this one.

That's a work in progress project. Use at your own risk.

**Check Samples folder to see some examples** ~~I swear i'll improve documentation when I have time~~

Roadmap:
1. Includes documentation (wiki or in README)
2. More tests to increase coverage
3. Includes CI
4. Includes compatible browsers on READAME.
