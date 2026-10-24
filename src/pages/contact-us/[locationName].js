import ContactUs from "@/components/ContactUs/ContactUs";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import LocalitySchema from "@/utils/LocalitySchema";
import { useRouter } from "next/router";

export default function ContactUsPage() {
    const router = useRouter();
    const { locationName } = router.query;

    return (
        <>
            {locationName && (
                <LocalitySchema
                    location={locationName}
                    pageUrl={`/contact-us/${locationName}/`}
                />
            )}
            <SecondaryLayout>
                <ContactUs />
            </SecondaryLayout>
        </>
    );
}