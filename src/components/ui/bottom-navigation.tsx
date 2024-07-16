import { Dock, DockIcon } from "../magicui/dock";
import { buttonVariants } from "./button";
import { Separator } from "./separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

interface Props {
	home?: React.ReactNode;
	blog?: React.ReactNode;
	books?: React.ReactNode;
	github?: React.ReactNode;
	linkedin?: React.ReactNode;
	x?: React.ReactNode;
}

export default function BottomNavigation({
	home,
	blog,
	github,
	linkedin,
	x,
}: Props) {
	return (
		<Dock direction="middle" className="rounded-3xl">
			<DockIcon
				className={buttonVariants({
					className: "rounded-full w-full",
					variant: "ghost",
					size: "icon",
				})}
			>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>{home}</TooltipTrigger>
						<TooltipContent>Home</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
			<DockIcon
				className={buttonVariants({
					className: "rounded-full w-full",
					variant: "ghost",
					size: "icon",
				})}
			>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>{blog}</TooltipTrigger>
						<TooltipContent>Blog</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
			<Separator orientation="vertical" />
			<DockIcon
				className={buttonVariants({
					className: "rounded-full w-full",
					variant: "ghost",
					size: "icon",
				})}
			>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>{github}</TooltipTrigger>
						<TooltipContent>Github</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
			<DockIcon
				className={buttonVariants({
					className: "rounded-full w-full",
					variant: "ghost",
					size: "icon",
				})}
			>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>{linkedin}</TooltipTrigger>
						<TooltipContent>Linkedin</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
			<DockIcon
				className={buttonVariants({
					className: "rounded-full w-full",
					variant: "ghost",
					size: "icon",
				})}
			>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>{x}</TooltipTrigger>
						<TooltipContent>X</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
		</Dock>
	);
}
