import ContactUs from "@/components/ContactUs/ContactUs";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import LocalitySchema from "@/utils/LocalitySchema";

export default function ContactUsPage({ locationName = "" }) {
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

export async function getServerSideProps(context) {
    const { locationName } = context.params || {};
    return {
        props: {
            locationName: locationName || ""
        }
    };
}
