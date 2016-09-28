import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;

import com.wolfram.alpha.WAEngine;
import com.wolfram.alpha.WAException;
import com.wolfram.alpha.WAImage;
import com.wolfram.alpha.WAPlainText;
import com.wolfram.alpha.WAPod;
import com.wolfram.alpha.WAQuery;
import com.wolfram.alpha.WAQueryResult;
import com.wolfram.alpha.WASubpod;

public class AlphaAPISample {

    private static String appid = "3H4296-5YPAGQUJK7";
	private static int imageNum;

    public static void main(String[] args) throws IOException {
    	System.out.println("Enter equation");
    	BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
    	String input = br.readLine();
        if (args.length > 0)
            input = args[0];
        
        WAEngine engine = new WAEngine();
        
        // These properties will be set in all the WAQuery objects created from this WAEngine.
        engine.setAppID(appid);
        engine.addFormat("plaintext");

        // Create the query.
        WAQuery query = engine.createQuery();
        
        // Set properties of the query.
        query.setInput(input);
        query.addPodState("Step-by-step solution");
        query.addFormat("image");
        query.setWidth(500);
        
        
        
        try {
            // For educational purposes, print out the URL we are about to send:
            System.out.println("Query URL:");
            System.out.println(engine.toURL(query));
            System.out.println("");
            
            // This sends the URL to the Wolfram|Alpha server, gets the XML result
            // and parses it into an object hierarchy held by the WAQueryResult object.
            WAQueryResult queryResult = engine.performQuery(query);
            
            if (queryResult.isError()) {
                System.out.println("Query error");
                System.out.println("  error code: " + queryResult.getErrorCode());
                System.out.println("  error message: " + queryResult.getErrorMessage());
            } else if (!queryResult.isSuccess()) {
                System.out.println("Query was not understood; no results available.");
            } else {
                // Got a result.
                System.out.println("Successful query. Pods follow:\n");
                for (WAPod pod : queryResult.getPods()) {
                    if (!pod.isError()) {
                        System.out.println(pod.getTitle());
                        System.out.println("------------");
                        for (WASubpod subpod : pod.getSubpods()) {
                            for (Object element : subpod.getContents()) {
                                if (element instanceof WAPlainText) {
                                    System.out.println(((WAPlainText) element).getText());
                                    System.out.println("");
                                }
                                else if(element instanceof WAImage) {
                                	System.out.println(pod.getTitle());
                                	if(pod.getTitle().contains("Solution") || pod.getTitle().contains("steps") || pod.getTitle().contains("Derivative") || pod.getTitle().contains("integra"))
                                	{
                                		((WAImage) element).acquireImage();
                                    	byte[] data = Files.readAllBytes(((WAImage) element).getFile().toPath());
                                    	
                                    	FileOutputStream fos = new FileOutputStream("test/"+imageNum+".gif");
                                    	fos.write(data);
                                    	imageNum++;
                                	}
                                		
                                	
                                	
                                }
                            }
                        }
                        System.out.println("");
                    }
                }
               
            }
        } catch (WAException e) {
            e.printStackTrace();
        }
    }

}
