import React from "react";
import classNames from "classnames";

export const CompetitionIcon = ({className}) =>{
    const classes = classNames(
        className
    )
    return(
        <svg 
        width="57" 
        height="59" 
        className ={classes}
        viewBox="0 0 57 59" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g filter="url(#filter0_d_74_1006)">
<rect x="4" width="49" height="50.1667" fill="url(#pattern0)" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_74_1006" x="0" y="0" width="57" height="58.1667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_1006"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_1006" result="shape"/>
</filter>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_74_1006" transform="translate(-0.0119048) scale(0.00204762 0.002)"/>
</pattern>
<image id="image0_74_1006" width="500" height="500" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTExLTExVDIzOjUxOjM3KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0xMS0xNFQxNDowNDozMyswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0xMS0xNFQxNDowNDozMyswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMDQzN2M3OS02OGM2LTk3NDMtOWQ5Yi1lYjRmZjgwNzM3OWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NmQ4MzMwNGUtZDc1OC04NTQzLWFlNTYtYTE2MmY0OWFhYzYyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmQ4MzMwNGUtZDc1OC04NTQzLWFlNTYtYTE2MmY0OWFhYzYyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZDgzMzA0ZS1kNzU4LTg1NDMtYWU1Ni1hMTYyZjQ5YWFjNjIiIHN0RXZ0OndoZW49IjIwMjItMTEtMTFUMjM6NTE6MzcrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzA0MzdjNzktNjhjNi05NzQzLTlkOWItZWI0ZmY4MDczNzlmIiBzdEV2dDp3aGVuPSIyMDIyLTExLTE0VDE0OjA0OjMzKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xjfwjgAAMolJREFUeNrt3XtwVOX9x/Hsye5mk+yajQnZQEwIxKCAjI5cxgSmEzMERsQkXKzFKToiCRByqcHipYNIf8N4qVJ0Ov5hnQ5/2Rk7DqO9UDtjoXWKitpabUEuSQQSyCIhpEkg193f8+CuRgyQyzl7bu/XzE4USLL7nPOcz/k+Z893HeFwOA4AAJibwhAAAECgAwAAAh0AABDoAACAQAcAgEAHAAAEOgAAINABAACBDgCAtTjKysoYBcBaRtr+0cFQAVToAMwd5qP9twAMzskQALYL8uG+j2od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"/>
</defs>
</svg>

    )
}