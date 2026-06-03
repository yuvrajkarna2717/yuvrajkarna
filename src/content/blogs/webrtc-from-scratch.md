---
title: "WebRTC from Scratch: Building Video Recording in the Browser"
date: "Mar 2025"
readTime: "8 min"
tags: ["WebRTC", "JavaScript", "Media"]
summary: "Everything I learned building a WebRTC recorder — device selection, MediaRecorder API, and the browser quirks nobody warns you about."
external: false
externalUrl: ""
---

# WebRTC from Scratch: Building Video Recording in the Browser

I needed to build a browser-based video recorder for a project. Sounds simple until you're knee-deep in `getUserMedia`, MIME type hell, and Safari's unique interpretation of the spec.

## Getting a Media Stream

Everything starts with `getUserMedia`. It returns a `MediaStream` of audio/video tracks.

```js
const stream = await navigator.mediaDevices.getUserMedia({
  video: { width: 1280, height: 720 },
  audio: true,
});
```

Hook it up to a `<video>` element to show the live preview:

```tsx
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.srcObject = stream;
  }
}, [stream]);
```

## Enumerating Devices

Letting users pick their camera/microphone requires `enumerateDevices`.

```js
const devices = await navigator.mediaDevices.enumerateDevices();
const cameras = devices.filter(d => d.kind === "videoinput");
const mics    = devices.filter(d => d.kind === "audioinput");
```

> **Gotcha:** Labels are empty strings until the user grants permission. Always call `getUserMedia` first.

## Recording with MediaRecorder

`MediaRecorder` chunks the stream into blobs you accumulate and then stitch together.

```js
const chunks: BlobPart[] = [];
const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9,opus" });

recorder.ondataavailable = e => {
  if (e.data.size > 0) chunks.push(e.data);
};

recorder.onstop = () => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url  = URL.createObjectURL(blob);
  // let user download it
  const a = document.createElement("a");
  a.href = url;
  a.download = "recording.webm";
  a.click();
  URL.revokeObjectURL(url);
};

recorder.start(1000); // collect a chunk every second
```

## MIME Type Compatibility

Not every browser supports every codec. The safe approach:

```js
function getSupportedMimeType() {
  const types = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return types.find(t => MediaRecorder.isTypeSupported(t)) ?? "";
}
```

## Safari's Quirks

Safari supports `video/mp4` but **not** `video/webm`. Always check `isTypeSupported` and never hardcode a MIME type. Safari also fires `ondataavailable` with the full recording only on `stop`, not on the timeslice interval — plan accordingly.

## Cleaning Up

Always stop tracks when done, or the browser indicator light stays on.

```js
stream.getTracks().forEach(track => track.stop());
```

## Final Architecture

```
useMediaDevices  →  enumerates cameras / mics
useMediaStream   →  calls getUserMedia, returns stream + stop()
useRecorder      →  wraps MediaRecorder, returns start / stop / blob
RecorderUI       →  wires the hooks to buttons and preview
```

Keeping these concerns in separate hooks made testing and swapping implementations trivial.
