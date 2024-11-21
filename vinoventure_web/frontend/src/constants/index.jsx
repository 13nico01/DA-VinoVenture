import {BotMessageSquare} from "lucide-react";
import {BatteryCharging} from "lucide-react";
import {Fingerprint} from "lucide-react";
import {ShieldHalf} from "lucide-react";
import {PlugZap} from "lucide-react";
import {GlobeLock} from "lucide-react";

export const navItems = [
    {label: "Home", href: "#"},
    {label: "Shop", href: './Shop.jsx'},
    {label: "About", href: "#"},
];

export const features = [
    {
        icon: <BotMessageSquare/>,
        text: "Drag-and-Drop Interface",
        description:
            "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
    },
    {
        icon: <Fingerprint/>,
        text: "Multi-Platform Compatibility",
        description:
            "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
    },
    {
        icon: <ShieldHalf/>,
        text: "Built-in Templates",
        description:
            "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
    },
    {
        icon: <BatteryCharging/>,
        text: "Real-Time Preview",
        description:
            "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
    },
    {
        icon: <PlugZap/>,
        text: "Collaboration Tools",
        description:
            "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
    },
    {
        icon: <GlobeLock/>,
        text: "Analytics Dashboard",
        description:
            "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
    },
];

export const checklistItems = [
    {
        title: "Code merge made easy",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "Review code without worry",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "AI Assistance to reduce time",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "Share work in minutes",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
];

export const pricingOptions = [
    {
        title: "Free",
        price: "$0",
        features: [
            "Private board sharing",
            "5 Gb Storage",
            "Web Analytics",
            "Private Mode",
        ],
    },
    {
        title: "Pro",
        price: "$10",
        features: [
            "Private board sharing",
            "10 Gb Storage",
            "Web Analytics (Advance)",
            "Private Mode",
        ],
    },
    {
        title: "Enterprise",
        price: "$200",
        features: [
            "Private board sharing",
            "Unlimited Storage",
            "High Performance Network",
            "Private Mode",
        ],
    },
];

export const resourcesLinks = [
    {href: "#", text: "Getting Started"},
    {href: "#", text: "Documentation"},
    {href: "#", text: "Tutorials"},
    {href: "#", text: "API Reference"},
    {href: "#", text: "Community Forums"},
];

export const platformLinks = [
    {href: "#", text: "Features"},
    {href: "#", text: "Supported Devices"},
    {href: "#", text: "System Requirements"},
    {href: "#", text: "Downloads"},
    {href: "#", text: "Release Notes"},
];

export const communityLinks = [
    {href: "#", text: "Events"},
    {href: "#", text: "Meetups"},
    {href: "#", text: "Conferences"},
    {href: "#", text: "Hackathons"},
    {href: "#", text: "Jobs"},
];
