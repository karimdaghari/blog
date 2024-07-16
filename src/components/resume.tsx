import {
	Document,
	Font,
	Link,
	PDFDownloadLink,
	PDFViewer,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import LatoBold from "~/assets/fonts/Lato-Bold.ttf";
import Lato from "~/assets/fonts/Lato-Regular.ttf";
import { Config } from "~/consts";
import { buttonVariants } from "./ui/button";

Font.register({
	family: "Lato",
	fontStyle: "normal",
	fontWeight: "normal",
	fonts: [
		{
			src: Lato,
			fontWeight: "normal",
		},
		{
			src: LatoBold,
			fontWeight: "bold",
		},
	],
});

const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: "40 50",
		fontFamily: "Lato",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	contact: {
		fontSize: 11,
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 12,
		fontWeight: "bold",
		marginTop: 12,
		marginBottom: 8,
		paddingBottom: 3,
		borderBottomWidth: 1.25,
		borderBottomColor: "#1D428A",
		textTransform: "uppercase",
		color: "#1D428A",
	},
	leftColumn: {
		flexDirection: "column",
		alignItems: "flex-start",
		flex: 1,
	},
	rightColumn: {
		flexDirection: "column",
		alignItems: "flex-end",
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	itemTitle: {
		fontSize: 11,
		fontWeight: "bold",
	},
	itemEntity: {
		fontSize: 10,
	},
	itemPeriod: {
		fontSize: 10,
		textAlign: "right",
		fontWeight: "bold",
	},
	itemLocation: {
		fontSize: 10,
		textAlign: "right",
	},
	bulletPoint: {
		flexDirection: "row",
		marginBottom: 4,
	},
	bullet: {
		width: 10,
		fontSize: 10,
	},
	bulletText: {
		flex: 1,
		fontSize: 10,
		fontFamily: "Lato",
	},
});

const BulletPoint = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<View style={styles.bulletPoint}>
		<Text style={styles.bullet}>•</Text>
		<Text style={styles.bulletText}>{children}</Text>
	</View>
);

interface ItemHeaderProps {
	title: string;
	entity?: string;
	period: string;
	location?: string;
}

const ItemHeader = ({ title, entity, period, location }: ItemHeaderProps) => (
	<View style={styles.itemHeader}>
		<View style={styles.leftColumn}>
			<Text style={[styles.itemTitle]}>{title}</Text>
			{entity && <Text style={styles.itemEntity}>{entity}</Text>}
		</View>
		<View style={styles.rightColumn}>
			<Text style={[styles.itemPeriod]}>{period}</Text>
			{location && <Text style={styles.itemLocation}>{location}</Text>}
		</View>
	</View>
);

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
	<View
		style={{
			marginBottom: 10,
		}}
	>
		<Text style={styles.sectionTitle}>{title}</Text>
		<View>{children}</View>
	</View>
);

interface WorkExperienceItemProps {
	jobTitle: string;
	company: string;
	location: string;
	period: string;
	achievements: string[];
}

const WorkExperienceItem = ({
	jobTitle,
	company,
	period,
	location,
	achievements,
}: WorkExperienceItemProps) => (
	<View
		style={{
			marginBottom: 10,
		}}
	>
		<ItemHeader
			title={jobTitle}
			entity={company}
			period={period}
			location={location}
		/>
		{achievements.map((achievement) => (
			<BulletPoint key={achievement}>{achievement}</BulletPoint>
		))}
	</View>
);

interface EducationProps {
	school: string;
	degree: string;
	period: string;
	location: string;
	notes: string[];
}

const EducationExperience = ({
	school,
	degree,
	period,
	location,
	notes,
}: EducationProps) => (
	<>
		<ItemHeader
			title={school}
			entity={degree}
			period={period}
			location={location}
		/>
		{notes.map((note) => (
			<BulletPoint key={note}>{note}</BulletPoint>
		))}
	</>
);

interface ResumeBuilderProps {
	location: string;
	workExperience: {
		title: string;
		data: WorkExperienceItemProps[];
	};
	education: {
		title: string;
		data: EducationProps[];
	};
	skills: {
		title: string;
		data: string[];
	};
}

const ResumeBuilder = ({
	education,
	location,
	skills,
	workExperience,
}: ResumeBuilderProps) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={{ textAlign: "center" }}>
				<Text style={styles.name}>{Config.me.fullName}</Text>
				<Text style={styles.contact}>
					<Link href={`mailto:${Config.me.email}`}>{Config.me.email}</Link> |{" "}
					{Config.me.phoneNumber} |{" "}
					<Link href={`${Config.siteUrl}/linkedin`}>Linkedin</Link> | {location}
				</Text>
			</View>

			<Section title={workExperience.title}>
				{workExperience.data.map((experience) => (
					<WorkExperienceItem key={experience.period} {...experience} />
				))}
			</Section>

			<Section title={education.title}>
				{education.data.map((edu) => (
					<EducationExperience key={edu.period} {...edu} />
				))}
			</Section>

			<Section title={skills.title}>
				{skills.data.map((skill) => (
					<BulletPoint key={skill}>{skill}</BulletPoint>
				))}
			</Section>
		</Page>
	</Document>
);

interface ViewerProps {
	children: React.ReactElement;
	fileName: string;
	buttonText: string;
}

const Viewer = ({ children, buttonText, fileName }: ViewerProps) => (
	<div className="flex flex-col items-end justify-center space-y-4">
		<PDFDownloadLink
			document={children}
			fileName={fileName}
			className={buttonVariants({})}
		>
			{buttonText}
		</PDFDownloadLink>
		<PDFViewer height="1070" width="100%" showToolbar={false}>
			{children}
		</PDFViewer>
	</div>
);

const English = () => (
	<ResumeBuilder
		location="Tunis, Tunisia"
		workExperience={{
			title: "Work Experience",
			data: [
				{
					jobTitle: "Chief Technical Officer & Co-founder",
					company: "WeRebase",
					location: "Tunis, Tunisia",
					period: "Nov 2023 – Present",
					achievements: [
						"Developed internal automation tools, streamlining 90% of operational processes, and migrated to a serverless architecture (AWS Lambda), reducing costs by over 60%",
						"Designed full-stack solutions using Next.js, TypeScript, and Tailwind CSS for client projects, collaborating with executives to improve business applications",
						"Spearheaded the development of a Monitoring and Evaluation solution for NGOs, aligning technological initiatives with business objectives in a spin-off project",
					],
				},
				{
					jobTitle: "Technical Lead",
					company: "Marzee",
					location: "Tunis, Tunisia",
					period: "Apr 2023 – Oct 2023",
					achievements: [
						"Acquired, onboarded, and managed client relationships, ensuring smooth project starts and ongoing satisfaction",
						"Worked with accounts of various sizes, including ILO.org, INL.int, ActiveFlow.pt, and switchlab.org",
						"Led efforts to redesign the organization's website, improving the company's online presence",
						"Managed one direct report and collaborated with various stakeholders, including partner agencies, teammates, and clients",
					],
				},
				{
					jobTitle: "Chief Technical Officer & Co-founder",
					company: "WeRebase",
					location: "Tunis, Tunisia",
					period: "Jan 2020 – Mar 2023",
					achievements: [
						"Led the end-to-end development of 6 products adopted in 15 African countries, while expanding services to include tech consulting for clients such as SignHouse and Delphos",
						"Conducted bilingual (French/English) career workshops for over 200 students and established partnerships with 6 prestigious Tunisian educational institutions (Dauphine-PSL Tunis, INSAT, Tunis Business School, Collège LaSalle Tunis, MSB-MedTech)",
						"Leveraged a diverse technology stack (e.g., Django, Next.js, Node.js) to develop full-stack solutions and reusable components, significantly reducing development time",
						"Implemented engineering best practices and agile methodologies, managing distributed teams to deliver high-quality solutions across multiple time zones",
					],
				},
			],
		}}
		education={{
			title: "Education",
			data: [
				{
					school: "Collège LaSalle Tunis",
					degree:
						"BTS (French Advanced Technician's Certificate), Computer Science",
					period: "2020 – 2022",
					location: "Tunis, Tunisia",
					notes: [
						"Focus areas: algorithms, programming languages, computer architecture, and software engineering",
						"Graduated top of my class",
					],
				},
			],
		}}
		skills={{
			title: "Skills",
			data: [
				"Technologies: Next.js/React.js, TypeScript, Node.js, AWS Lambda",
				"Languages: French (fluent), English (fluent)",
			],
		}}
	/>
);

const French = () => (
	<ResumeBuilder
		location="Tunis, Tunisie"
		workExperience={{
			title: "Expérience Professionnelle",
			data: [
				{
					jobTitle: "Directeur Technique & Co-fondateur",
					company: "WeRebase",
					location: "Tunis, Tunisie",
					period: "Nov 2023 – Présent",
					achievements: [
						"Développé des outils d'automatisation internes, rationalisant 90% des processus opérationnels, et migré vers une architecture serverless (AWS Lambda), réduisant les coûts de plus de 60%",
						"Conçu des solutions full-stack utilisant Next.js, TypeScript et Tailwind CSS pour des projets clients, collaborant avec des dirigeants pour améliorer les applications métier",
						"Piloté le développement d'une solution de Suivi et Évaluation pour les ONG, alignant les initiatives technologiques avec les objectifs commerciaux dans un projet de spin-off",
					],
				},
				{
					jobTitle: "Responsable Technique (Tech Lead)",
					company: "Marzee",
					location: "Tunis, Tunisie",
					period: "Avr 2023 – Oct 2023",
					achievements: [
						"Acquis, intégré et géré les relations clients, assurant un démarrage fluide des projets et une satisfaction continue",
						"Travaillé avec des comptes de différentes tailles, notamment ILO.org, INL.int, ActiveFlow.pt et switchlab.org",
						"Dirigé les efforts de refonte du site web de l'organisation, améliorant la présence en ligne de l'entreprise",
						"Géré un subordonné direct et collaboré avec divers intervenants, y compris des agences partenaires, des coéquipiers et des clients",
					],
				},
				{
					jobTitle: "Directeur Technique & Co-fondateur",
					company: "WeRebase",
					location: "Tunis, Tunisie",
					period: "Jan 2020 – Mar 2023",
					achievements: [
						"Piloté le développement de 6 produits de bout en bout adoptés dans 15 pays africains, tout en étendant les services pour inclure le conseil tech pour des clients tels que SignHouse et Delphos",
						"Animé des ateliers de carrière bilingues (Français/Anglais) pour plus de 200 étudiants et établi des partenariats avec 6 institutions éducatives Tunisiennes prestigieuses (Dauphine-PSL Tunis, INSAT, Tunis Business School, Collège LaSalle Tunis, MSB-MedTech)",
						"Exploité une stack technologique diverse (ex: Django, Next.js, Node.js) pour développer des solutions full-stack et des composants réutilisables, réduisant significativement le temps de développement",
						"Mis en place des meilleures pratiques d'ingénierie méthodologies agiles, gérant des équipes distribuées pour livrer des solutions de haute qualité à travers plusieurs fuseaux horaires",
					],
				},
			],
		}}
		education={{
			title: "Formation",
			data: [
				{
					school: "Collège LaSalle Tunis",
					degree: "BTS, Informatique de Gestion",
					period: "2020 – 2022",
					location: "Tunis, Tunisie",
					notes: [
						"Domaines principaux : algorithmes, langages de programmation, architecture informatique et ingénierie logicielle",
						"Major de promotion",
					],
				},
			],
		}}
		skills={{
			title: "Compétences",
			data: [
				"Technologies : Next.js/React.js, TypeScript, Node.js, AWS Lambda",
				"Langues : Français (courant), Anglais (courant)",
			],
		}}
	/>
);

export const ResumeEnglish = () => (
	<Viewer
		fileName="Karim_Daghari_Full-Stack_Resume.pdf"
		buttonText="Save as PDF"
	>
		<English />
	</Viewer>
);

export const ResumeFrench = () => (
	<Viewer
		fileName="Karim_Daghari_Full-Stack_CV.pdf"
		buttonText="Enregistrer en PDF"
	>
		<French />
	</Viewer>
);
