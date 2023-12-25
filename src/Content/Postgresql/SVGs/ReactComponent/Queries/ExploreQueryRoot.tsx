import * as React from "react";
import type { SVGProps } from "react";
const SvgExploreQueryRoot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={731}
    height={141}
    viewBox="-0.5 -0.5 731 141"
    {...props}
  >
    <path
      fill="#FFF"
      stroke="#000"
      strokeDasharray="3 3"
      d="M50 20h680v120H50z"
      pointerEvents="all"
    />
    <path fill="#FFF" stroke="#000" d="M0 0h90v40H0z" pointerEvents="all" />
    <text
      x={44.5}
      y={24.5}
      fontFamily="Helvetica"
      fontSize={12}
      textAnchor="middle"
    >
      {"Queries"}
    </text>
    <path
      fill="#FFF"
      stroke="#000"
      strokeMiterlimit={10}
      d="M140 50h53l17 17v43h-70V50Z"
      pointerEvents="all"
    />
    <path fillOpacity={0.05} d="M193 50v17h17Z" pointerEvents="all" />
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      d="M193 50v17h17"
      pointerEvents="all"
    />
    <text
      x={174.5}
      y={84.5}
      fontFamily="Helvetica"
      fontSize={12}
      textAnchor="middle"
    >
      {"SQL"}
    </text>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      d="M240.5 84.5v-10h300V64l19 15.5-19 15.5V84.5Z"
      pointerEvents="all"
    />
    <path
      fill="#FFF"
      stroke="#000"
      strokeMiterlimit={10}
      d="m630 45 50 35-50 35-50-35Z"
      pointerEvents="all"
    />
    <switch transform="translate(-.5 -.5)">
      <foreignObject
        width="100%"
        height="100%"
        pointerEvents="none"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
        style={{
          overflow: "visible",
          textAlign: "left",
        }}
      >
        <div
          
          style={{
            display: "flex",
            alignItems: "unsafe center",
            justifyContent: "unsafe center",
            width: 98,
            height: 1,
            paddingTop: 80,
            marginLeft: 581,
          }}
        >
          <div
            data-drawio-colors="color: rgb(0, 0, 0);"
            style={{
              boxSizing: "border-box",
              fontSize: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontFamily: "Helvetica",
                color: "#000",
                lineHeight: 1.2,
                pointerEvents: "all",
                whiteSpace: "normal",
                overflowWrap: "normal",
              }}
            >
              {"Persistence"}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={630}
        y={84}
        fontFamily="Helvetica"
        fontSize={12}
        textAnchor="middle"
      >
        {"Persistence"}
      </text>
    </switch>
  </svg>
);
export default SvgExploreQueryRoot;
